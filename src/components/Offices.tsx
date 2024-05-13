import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Spain" invert={invert}>
          N-340, 141
          <br />
          29680, Estepona, Malaga
        </Office>
      </li>
      <li>
        <Office name="Romania" invert={invert}>
          Strada Cristian 21
          <br />
          557260, Sibiu
        </Office>
      </li>
      <li>
        <Office name="USA" invert={invert}>
          555 NE 30th St
          <br />
          33137, Miami, FL
        </Office>
      </li>
    </ul>
  )
}
