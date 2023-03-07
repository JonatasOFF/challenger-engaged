export interface Characters {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  episode: Episode[];
}

export interface Episode {
  episode: string;
  name: string;
}

export interface EventWithScroll extends Event {
  deltaY: number;
}

export interface CharactersAPI {
  loading: boolean;
  data: {
    character: Characters;
  };
}
