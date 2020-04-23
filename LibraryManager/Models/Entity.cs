#nullable enable
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManager.Models
{
	public abstract class Entity<TIdType>
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public TIdType Id { get; set; }
	}
}
