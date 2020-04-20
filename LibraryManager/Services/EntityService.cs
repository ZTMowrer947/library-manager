using LibraryManager.Models;
using LibraryManager.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Services
{
	public abstract class EntityService<TEntity, TIdType> : IService<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		protected IRepository<TEntity, TIdType> _repository;

		protected EntityService(IRepository<TEntity, TIdType> repository)
		{
			_repository = repository ?? throw new ArgumentNullException(nameof(repository));
		}

		public virtual async Task<ICollection<TEntity>> GetList()
		{
			throw new NotImplementedException();
		}

		public virtual async Task<TEntity> GetById(TIdType id)
		{
			throw new NotImplementedException();
		}

		public virtual async Task Create(TEntity entity)
		{
			throw new NotImplementedException();
		}

		public virtual async Task Update(TEntity entity)
		{
			throw new NotImplementedException();
		}

		public virtual async Task Delete(TIdType id)
		{
			throw new NotImplementedException();
		}
	}
}
