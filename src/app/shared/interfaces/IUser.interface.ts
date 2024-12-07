export interface IUser {
  id: number,
  userName: string,
  email: string,
  country: string,
  phoneNumber: string,
  imagePath: string | null,
  group: {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string
  },
  creationDate: string,
  modificationDate: string
}
