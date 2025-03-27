using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

[Table("profiles")]
public class Profile : BaseModel
{
    [PrimaryKey("id")]
    public Guid Id { get; set; }
    [Column("email")]
    public string Email { get; set; }

    [Column("role_id")]
    public Guid RoleId { get; set; }

    [Column("avatar_url")]
    public string AvatarUrl { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
[Table("roles")]
public class Role : BaseModel
{
    [PrimaryKey("id")]
    public Guid Id { get; set; }
    
    [Column("role_name")]
    public string RoleName { get; set; }
}