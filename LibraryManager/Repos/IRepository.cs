using LibraryManager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryManager.Repos
{
	public interface IRepository<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		public Task<ICollection<TEntity>> FindAll();
		public Task<TEntity?> FindById(TIdType id);
		public Task Create(TEntity entity);
		public Task Update(TEntity entity);
		public Task Delete(TEntity entity);
	}
}
