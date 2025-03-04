namespace DAL
{
    public interface IRepository<T> where T : class
    {
        Task CreateTable();
        Task<T?> GetByIdAsync(int id);
        Task<T?> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> DeleteAsync(int id);
    }
}
