import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/todoStore";
import {
  setCurrentPage,
  setItemsPerPage,
} from "../store/slices/paginationSlice";

export function Pagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, itemsPerPage, totalItems } = useSelector(
    (state: RootState) => state.pagination,
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (value: string) => {
    dispatch(setItemsPerPage(Number(value)));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Rows per page</span>
        <Select
          value={String(itemsPerPage)}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={itemsPerPage} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
