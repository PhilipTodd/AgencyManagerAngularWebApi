namespace AgencyManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Interview
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }

        [MaxLength(5000)]
        public string Notes { get; set; }

        public int ContactId { get; set; }
        public virtual Contact Contact { get; set; }

        public int PositionId { get; set; }
        public virtual Position Position { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
    }
}
