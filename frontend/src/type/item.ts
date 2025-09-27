//추후 백엔드와 연동 시 Dto로 변경해주면 된다. ex)ItemDto
//지금은 임시 데이터

export type Item = {
    id: number;
    name: string;
    content: string;
    price: number;
    imageUrl: string;
    createdAt:string;
    updatedAt:string;
  };
  