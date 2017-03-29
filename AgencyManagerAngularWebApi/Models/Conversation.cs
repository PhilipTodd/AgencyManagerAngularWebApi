namespace AgencyManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Conversation
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }

        [Required]
        [MaxLength(500)]
        public string Notes { get; set; }

        public int ContactId { get; set; }
        public virtual Contact Contact { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}
