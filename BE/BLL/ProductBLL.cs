using BLL.Interface;
using DTO.Responses;

namespace BLL
{
    internal class ProductBLL : IProduct
    {
        public BaseResponseModel GetProducts(int? productId, int? cateId, int? subCateId, string? productName, int pageNumber = 1, int pageSize = 10, int sortByName = 0, int sortByPrice = 0)
        {
            throw new NotImplementedException();
        }
    }
}
