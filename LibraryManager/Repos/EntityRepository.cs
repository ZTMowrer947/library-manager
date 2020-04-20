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
			throw new NotImplementedException();
		}

		public virtual void Update(TEntity entity)
		{
			throw new NotImplementedException();
		}

		public virtual void Delete(TEntity entity)
		{
			throw new NotImplementedException();
		}
	}
}
