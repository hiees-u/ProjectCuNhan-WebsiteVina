using DTO.Responses;

namespace BLL.Interface
{
    public interface IProduct
    {
        public BaseResponseModel GetProducts(int? productId, int? cateId, int? subCateId, string? productName, int pageNumber = 1, int pageSize = 10, int sortByName = 0, int sortByPrice = 0);


    }
}
