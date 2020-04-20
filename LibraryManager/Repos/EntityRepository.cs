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

		public abstract Task<ICollection<TEntity>> FindAll();

		public abstract Task<TEntity?> FindById(TIdType id);

		public virtual async Task Create(TEntity entity)
		{
			// Add entity to context
			_context.Set<TEntity>().Add(entity);

			// Persist changes to database
			await _context.SaveChangesAsync();
		}

		public virtual async Task Update(TEntity entity)
		{
			// Update entity
			_context.Set<TEntity>().Update(entity);

			// Persist changes to database
			await _context.SaveChangesAsync();
		}

		public virtual async Task Delete(TEntity entity)
		{
			// Delete entity
			_context.Set<TEntity>().Remove(entity);

			// Persist changes to database
			await _context.SaveChangesAsync();
		}
	}
}
