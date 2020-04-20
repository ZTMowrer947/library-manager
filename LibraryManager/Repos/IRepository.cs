#nullable enable
using LibraryManager.Models;
using System.Collections.Generic;

namespace LibraryManager.Repos
{
	public interface IRepository<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		public ICollection<TEntity> FindAll();
		public TEntity? FindById(TIdType id);
		public void Create(TEntity entity);
		public void Update(TEntity entity);
		public void Delete(TEntity entity);
	}
}
