using LibraryManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManager.Services
{
	interface IService<TEntity, TIdType>
		where TEntity : Entity<TIdType>
	{
		ICollection<TEntity> GetList();
		TEntity GetById(TIdType id);
		void Create(TEntity entity);
		void Update(TIdType id, TEntity entity);
		void Delete(TIdType id);
	}
}
