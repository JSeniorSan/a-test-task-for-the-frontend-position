export type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  setNewOffset: (value: number) => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};
