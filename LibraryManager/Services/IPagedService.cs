using LibraryManager.Models;
using System.Threading.Tasks;

namespace LibraryManager.Services
{
	public interface IPagedService<TEntity, TIdType> : IService<TEntity, TIdType>
		where TEntity: Entity<TIdType>
	{
		public Task<Page<TEntity>> GetPage(int pageNumber, int itemsPerPage); 
	}
}
