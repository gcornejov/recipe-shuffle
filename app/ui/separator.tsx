export default function Separator({ height }: { height?: Number }) {
  return (
    <hr style={{ 'borderTop': `${height || 8}px solid #bbb`, 'borderRadius': '5px' }} />
  );
}