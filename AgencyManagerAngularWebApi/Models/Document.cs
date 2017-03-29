namespace AgencyManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Document
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Version { get; set; }

        public DateTime UploadDate { get; set; }
        public DateTime UploadTime { get; set; }

        public byte Data { get; set; }

        [MaxLength(100)]
        public string Notes { get; set; }

        public int PositionId { get; set; }
        public int CompanyId { get; set; }
        public int ContractId { get; set; }

        public virtual Company Company { get; set; }
        public virtual Contract Contract { get; set; }
        public virtual Position Position { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}
