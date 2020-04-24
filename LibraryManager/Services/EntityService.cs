using LibraryManager.Models;
using LibraryManager.Repos;
using System;
using System.Collections.Generic;
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
			return await _repository.FindAll();
		}

		public virtual async Task<TEntity?> GetById(TIdType id)
		{
			return await _repository.FindById(id);
		}

		public virtual async Task Create(TEntity entity)
		{
			await _repository.Create(entity);
		}

		public virtual async Task Update(TEntity entity)
		{
			await _repository.Update(entity);
		}

		public virtual async Task Delete(TIdType id)
		{
			// Attempt to find entity with given ID
			var entity = await _repository.FindById(id);

			// If the entity was found,
			if (entity != null)
			{
				// Delete it
				await _repository.Delete(entity);
			}
		}
	}
}
