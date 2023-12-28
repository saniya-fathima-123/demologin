import type { CityDocument, CityDraft } from '../models/City';
import { City } from '../models/City';
class CityService {
  public async createCity(CityDraft: CityDraft): Promise<CityDocument> {
    try{
      
    const { cityName,cityCode } = CityDraft;

    const existingUser = await City.findOne<CityDocument>({ cityName});
    if (existingUser !== null) {
      throw new Error('City already exists.');
    }
    const newRegistration = new City({ cityName,cityCode });
    // Save the registration to the database
    
    return await newRegistration.save();
    console.log(newRegistration);
    

  }catch (error) {
    console.log("saniya error");
    console.error(error);
    throw new Error('Error creating city.');
}
  }

//   public async deleteCity(CityDraft: CityDraft): Promise<CityDocument> {
//     try{



//     }
// }
}
export default new CityService();
