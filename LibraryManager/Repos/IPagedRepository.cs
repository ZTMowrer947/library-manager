using LibraryManager.Models;
using System.Threading.Tasks;

namespace LibraryManager.Repos
{
	public interface IPagedRepository<TEntity, TIdType> : IRepository<TEntity, TIdType>
		where TEntity: Entity<TIdType>
	{
		public Task<Page<TEntity>> FindPage(int pageNumber, int itemsPerPage);
	}
}
