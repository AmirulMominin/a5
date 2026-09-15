export type PropertiesType ={
      id: string,
      name: string,
      details: string,
      rent: string,
      image : string,
      type: string,
      location: string,
      status: string,
      landlordId: string,
      categoryId: string,
      createdAt: string,
      updatedAt: string,
      content?: string,
      area? : number
}

export type registerPrvStateType = {
    success: string,
    message: string
} | null 

export type IUser = {
    success : boolean,
    message : string,
    data : {
         
            id : string,
            name : string,
            email : string,
            activeStatus : string,
            role : string,
            createdAt : string,
            updatedAt : string,
            stripeCustomerId ? :string
        
    }
} 

export type UserData = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  stripeCustomerId?: string;
};


