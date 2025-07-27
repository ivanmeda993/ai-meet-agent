import { Button } from '@/components/ui/button';

interface Props {
  page: number;
  totalPages: number;
  totalSearchCount: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({
  page,
  totalPages,
  totalSearchCount,
  onPageChange,
}: Props) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex-1 text-xs text-muted-foreground flex'>
        {totalSearchCount === 0 ? (
          <p>No results found</p>
        ) : (
          <div className='flex justify-between  divide-accent '>
            <p>
              Page {page} of {totalPages || 1}
            </p>
            <p>, {totalSearchCount} results</p>
          </div>
        )}
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          disabled={page === 1}
          variant='outline'
          size='sm'
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant='outline'
          size='sm'
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
