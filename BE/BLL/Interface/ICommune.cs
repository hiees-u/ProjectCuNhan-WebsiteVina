using DTO.Responses;

namespace BLL.Interface
{
    public interface ICommune
    {
        public BaseResponseModel Gets();
        public BaseResponseModel GetCommunesByDistrictIDAsync(int districID);
    }
}
