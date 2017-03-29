using AgencyManager.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
namespace AgencyManager.DAL
{
    public class AgencyManagerContext : BaseDbContext
    {
        public AgencyManagerContext() : base("name=AgencyManagerContext")
        {
            Configuration.LazyLoadingEnabled = false;
            //Database.SetInitializer<AgencyManagerContext>(new AgencyManagerInitialiser<AgencyManagerContext>());
        }

        public DbSet<Agent> Agents { get; set; }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<CompanyCategory> CompanyCategories { get; set; }
        public virtual DbSet<ContactCategory> ContactCategories { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Contract> Contracts { get; set; }
        public virtual DbSet<Conversation> Conversations { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<Industry> Industries { get; set; }
        public virtual DbSet<Interview> Interviews { get; set; }
        public virtual DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Address>()
               .HasMany(e => e.Companies)
               .WithMany(e => e.Addresses)
               .Map(m => m.ToTable("AddressCompany").MapLeftKey("Addresses_Id").MapRightKey("Companies_Id"));

            //modelBuilder.Entity<Company>()
            //    .HasMany(e => e.Contacts)
            //    .WithRequired(e => e.Company)
            //    .WillCascadeOnDelete(false);

            modelBuilder.Entity<Company>()
                .HasMany(e => e.Contracts)
                .WithRequired(e => e.Company)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Company>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.Company)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Company>()
                .HasMany(e => e.Positions)
                .WithMany(e => e.Companies)
                .Map(m => m.ToTable("PositionCompany").MapLeftKey("Companies_Id").MapRightKey("Positions_Id"));

            modelBuilder.Entity<CompanyCategory>()
                .HasMany(e => e.Companies)
                .WithRequired(e => e.CompanyCategory)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ContactCategory>()
                .HasMany(e => e.Contacts)
                .WithRequired(e => e.ContactCategory)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Contact>()
                .HasMany(e => e.Conversations)
                .WithRequired(e => e.Contact)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Contact>()
                .HasMany(e => e.Interviews)
                .WithRequired(e => e.Contact)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Contract>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.Contract)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Industry>()
                .HasMany(e => e.Companies)
                .WithRequired(e => e.Industry)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Position>()
                .HasMany(e => e.Contracts)
                .WithRequired(e => e.Position)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Position>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.Position)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Position>()
                .HasMany(e => e.Interviews)
                .WithRequired(e => e.Position)
                .WillCascadeOnDelete(false);
        }
    }
}