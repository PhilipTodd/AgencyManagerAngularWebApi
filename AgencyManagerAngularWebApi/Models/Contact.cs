namespace AgencyManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Contact
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Contact()
        {
            Conversations = new HashSet<Conversation>();
            Interviews = new HashSet<Interview>();
        }

        public int Id { get; set; }

        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [MaxLength(50)]
        public string Phone { get; set; }

        [MaxLength(50)]
        public string Mobile { get; set; }

        [MaxLength(50)]
        public string Fax { get; set; }

        [MaxLength(50)]
        public string Email { get; set; }

        [MaxLength(5000)]
        public string Notes { get; set; }

        [MaxLength(10)]
        public string ContactType { get; set; } //AGENT or COMPANY

        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }

        public int? AgentId { get; set; }
        public virtual Agent Agent { get; set; }

        public int ContactCategoryId { get; set; }
        public virtual ContactCategory ContactCategory { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Conversation> Conversations { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Interview> Interviews { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Position> Positions { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}
