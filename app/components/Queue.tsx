"use client"

import { socket } from "@/socket";
import { DeployItem } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import StatusToggle from "./StatusToggle";
import Status from "./Status";

export default function Queue( {  } ) {
	const [ queue, setQueue ] = useState<DeployItem[]>( [] );
	const { data: session } = useSession();

  socket.on( 'response', ( item: DeployItem ) => {
    setQueue( [ ...queue, item ] );
  } );

  return (
    <div className="card queue">
      <h2>Queue</h2>
      { !queue.length && <div>Nothing yet!</div> }
      { queue.map( ( item, i ) => {
				return (
				<div key={ `${ i }-${ item.pullRequest.number }` } className="card queue-item">
					<header>
						{ item.user &&
							<div className="queue-item__user">
								<Image
									src={ item.user.image ?? '#' }
									width={ 20 }
									height={ 20 }
									alt={ item.user.name ?? item.user.email ?? item.user.id ?? 'someone?' }
								/>
								<span>
									{ item.user.name }
								</span>
							</div>
						}
						<div>
							{ new Date( item.timestamp ).toLocaleTimeString( undefined, { weekday: 'short' } ) }
						</div>
					</header>
					<div className="queue-item__inner">
						{ ( session?.user?.email &&
							session.user.id === item?.user?.id
						) ? <StatusToggle /> : <Status /> }
						<h2>
							{ item.pullRequest.title }
						</h2>
						<a href={ item.pullRequest.html_url } target="_blank">
							{ item.pullRequest.html_url }
						</a>
						{/* <p>{ item.message }</p> */}
					</div>
        </div>
      )} ) }
    </div>
  );
}