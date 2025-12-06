    import * as React from 'react';
    import { parseISO, format } from 'date-fns';

    export default function Date({ dateString }: { dateString: string }) {
      const date = parseISO(dateString);
      return React.createElement('time', { dateTime: dateString }, format(date, 'LLLL d, yyyy'));
    }