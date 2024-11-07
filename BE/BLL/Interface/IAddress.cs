using DTO.Responses;

namespace BLL.Interface
{
    public interface IAddress
    {
        public BaseResponseModel GetById(int iD);
    }
}
