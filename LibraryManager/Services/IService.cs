using LibraryManager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibraryManager.Services
{
	interface IService<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		Task<ICollection<TEntity>> GetList();
		Task<TEntity> GetById(TIdType id);
		Task Create(TEntity entity);
		Task Update(TEntity entity);
		Task Delete(TIdType id);
	}
}
