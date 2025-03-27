using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace NutriPit.Api.Controllers
{
    /// <summary>
    /// Endpoints d'authentification.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _supabaseUrl;
        private readonly string _supabaseAnonKey;

        public AuthController(IConfiguration configuration)
        {
            _supabaseUrl = configuration["Supabase:Url"];       // Par exemple : "https://your-project.supabase.co"
            _supabaseAnonKey = configuration["Supabase:AnonKey"]; // Votre clé anonyme
        }

        /// <summary>
        /// Authentifie un utilisateur en vérifiant ses identifiants.
        /// </summary>
        /// <param name="request">Les identifiants de connexion.</param>
        /// <returns>L'utilisateur authentifié.</returns>
        /// <response code="200">Utilisateur authentifié avec succès.</response>
        /// <response code="400">Identifiants invalides ou erreur d'authentification.</response>
        [HttpPost("login")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var vClient = new Supabase.Client(_supabaseUrl, _supabaseAnonKey);
            var vUser = await vClient.Auth.SignInWithPassword(request.Email, request.Password);
            var vProfile = await vClient.From<Profile>().Where(x => x.Email == request.Email).Single();
            var vRole = await vClient.From<Role>().Where(x => x.Id == vProfile.RoleId).Single();

            var result = new
            {
                User = new { vProfile.Id, vProfile.Email },
                Role = new { vRole.Id, vRole.RoleName }
            };
            return Ok(result);
        }

        /// <summary>
        /// Inscrit un nouvel utilisateur.
        /// </summary>
        /// <param name="request">Les informations d'inscription.</param>
        /// <returns>L'utilisateur inscrit.</returns>
        /// <response code="200">Utilisateur créé avec succès.</response>
        /// <response code="400">Informations d'inscription invalides.</response>
        [HttpPost("signup")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            var endpoint = $"{_supabaseUrl}/auth/v1/signup";
            // On transmet dans les options les métadonnées, ici le rôle "manager" par défaut
            var payload = new
            {
                email = request.Email,
                password = request.Password,
                options = new
                {
                    data = new
                    {
                        role = "manager"
                    }
                }
            };
            var jsonPayload = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("apikey", _supabaseAnonKey);

            var response = await _httpClient.PostAsync(endpoint, content);
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                return BadRequest(errorContent);
            }
            var responseContent = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<object>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            return Ok(result);
        }

        /// <summary>
        /// Envoie un email de réinitialisation du mot de passe à l'utilisateur.
        /// </summary>
        /// <param name="request">L'email de l'utilisateur.</param>
        /// <returns>Confirmation de l'envoi de l'email.</returns>
        /// <response code="200">Email de réinitialisation envoyé avec succès.</response>
        /// <response code="400">Adresse email invalide ou erreur de réinitialisation.</response>
        [HttpPost("resetpassword")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var endpoint = $"{_supabaseUrl}/auth/v1/resetPasswordForEmail";
            var payload = new { email = request.Email };
            var jsonPayload = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("apikey", _supabaseAnonKey);

            var response = await _httpClient.PostAsync(endpoint, content);
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                return BadRequest(errorContent);
            }
            return Ok("Email de réinitialisation envoyé");
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class SignupRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; }
    }
}
