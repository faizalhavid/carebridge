import React from 'react';
import ResourceTable from './Table';
import ResourceDialog from './Dialog';
import { ResourceProvider, ResourceProviderProps } from '@/hooks/resource-provider';
import { BaseEntity } from '@/types/models/base-entity';
import { Box } from '@mui/material';

// New ResourceView component that accepts high-level props
export function ResourceView<T extends BaseEntity>(props: ResourceProviderProps<T>) {
  return (
    <>
      <ResourceProvider {...props}>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flexGrow: 1,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <ResourceTable<T> />
          <ResourceDialog<T> />
        </Box>
      </ResourceProvider>
    </>
  );
}

export default ResourceView;
