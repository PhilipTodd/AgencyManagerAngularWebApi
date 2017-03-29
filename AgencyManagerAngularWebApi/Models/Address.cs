namespace AgencyManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Address
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Address()
        {
            Companies = new HashSet<Company>();
        }

        public int Id { get; set; }

        [Required]
        [MaxLength(5000)]
        public string Number { get; set; }

        [Required]
        [MaxLength(100)]
        public string Street { get; set; }

        [MaxLength(100)]
        public string Suburb { get; set; }

        [MaxLength(50)]
        public string City { get; set; }

        [MaxLength(100)]
        public string State { get; set; }

        [MaxLength(10)]
        public string PostCode { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Company> Companies { get; set; }

        [NotMapped]
        public string AsAddressString {
            get
            {
                return string.Format("{0} {1}, {2}, {3}, {4}", this.Number, this.Street, this.Suburb, this.City, this.State);
            }
        }
    }
}
