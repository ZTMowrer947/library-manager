#nullable enable
using LibraryManager.Data;
using LibraryManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Repos
{
	public abstract class EntityRepository<TEntity, TIdType> : IRepository<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		protected LibraryContext _context;

		protected EntityRepository(LibraryContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
		}

		public abstract ICollection<TEntity> FindAll();

		public abstract TEntity? FindById(TIdType id);

		public virtual void Create(TEntity entity)
		{
			// Add entity to context
			_context.Set<TEntity>().Add(entity);

			// Persist changes to database
			_context.SaveChanges();
		}

		public virtual void Update(TEntity entity)
		{
			// Update entity
			_context.Set<TEntity>().Update(entity);

			// Persist changes to database
			_context.SaveChanges();
		}

		public virtual void Delete(TEntity entity)
		{
			// Delete entity
			_context.Set<TEntity>().Remove(entity);

			// Persist changes to database
			_context.SaveChanges();
		}
	}
}
