using LibraryManager.Data;
using LibraryManager.Models;
using System.Threading.Tasks;

namespace LibraryManager.Repos
{
	public abstract class PagedEntityRepository<TEntity, TIdType> : EntityRepository<TEntity, TIdType>, IPagedRepository<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		protected PagedEntityRepository(LibraryContext context) : base(context)
		{
		}

		public abstract Task<Page<TEntity>> FindPage(int pageNumber, int itemsPerPage);
	}
}
