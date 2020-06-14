using LibraryManager.Models;
using LibraryManager.Repos;
using System.Threading.Tasks;

namespace LibraryManager.Services
{
	public class PagedEntityService<TEntity, TIdType> : EntityService<TEntity, TIdType>, IPagedService<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		protected new IPagedRepository<TEntity, TIdType> _repository;

		public PagedEntityService(IPagedRepository<TEntity, TIdType> repository) : base(repository)
		{
			_repository = repository;
		}

		public Task<Page<TEntity>> GetPage(int pageNumber, int itemsPerPage)
		{
			return _repository.FindPage(pageNumber, itemsPerPage);
		}
	}
}
