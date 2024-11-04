export function Skeleton(): JSX.Element {
  return (
    <>
      <div className='flex justify-between items-center px-6 border-b pb-3'>
        <span className='text-lg font-medium'>Usuarios</span>
        <div className='bg-gray-200 md:bg-background rounded-full h-10 pl-10 w-full max-w-[150px] md:max-w-[255px]'></div>
      </div>
      <table className='w-full table-fixed my-3 text-sm text-wrap'>
        <thead>
          <tr className='border-b border-gray-200'>
            <th className='text-lg font-medium text-gray-700 px-6 pb-3 text-left'>Nombre</th>
            <th className='text-lg font-medium text-gray-700 px-6 pb-3 text-left'>Correo</th>
            <th className='text-lg font-medium text-gray-700 px-6 pb-3 text-right'></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, idx) => (
            <tr key={idx} className='h-14 border-b border-gray-200 animate-pulse'>
              <td className='pl-6 w-1/3'>
                <div className='h-4 bg-gray-300 rounded w-3/4'></div>
              </td>
              <td className='pl-6 w-1/3'>
                <div className='h-4 bg-gray-300 rounded w-3/4'></div>
              </td>
              <td className='pr-3 md:pl-12 lg:pl-24'>
                <div className='h-4 bg-gray-300 rounded w-1/2'></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
