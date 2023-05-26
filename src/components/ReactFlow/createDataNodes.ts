//-----IMPORTED FILES/MODULES
import { Edge, DataNode, DataStore } from '@/Types';

//----- Creates an array of all edges in the data table
export default function createDataNodes(dataObject: DataStore, edges: Edge[]): DataNode[] {
  const nodePositions = [
    { x: 1000, y: 400 },
    { x: 1000, y: 0 },
    { x: 0, y: 600 },
    { x: 0, y: 0 },
    { x: 2500, y: 200 },
    { x: 0, y: 200 },
    { x: 2000, y: 800 },
    { x: 0, y: 400 },
    { x: 0, y: 800 },
    { x: 1000, y: 800 },
    { x: 0, y: 1050 },
  ];
  // renders each table on the React Flow data canvas
  const nodes: DataNode[] = [];
  let i = 0;

  for (const tableKey in dataObject) {
    const rowData = dataObject[tableKey];

    nodes.push({
      id: tableKey,
      type: 'table',
      position: nodePositions[i],
      data: { table: [tableKey, rowData], edges }, 
    });
    i = (i + 1) % 17;
  }
  //console.log('nodes in CDN',nodes)
  return nodes;
}


