"use client"

import { socket } from "@/socket";
import { DeployItem } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function Queue( {  } ) {
  const [ queue, setQueue ] = useState<DeployItem[]>( [] );

  socket.on( 'new deploy', ( item: DeployItem ) => {
    setQueue( [ ...queue, item ] );
  } );

  return (
    <div className="card queue">
      <h2>Queue</h2>
      { !queue.length && <div>Nothing yet!</div> }
      { queue.map( ( item: DeployItem, i: number ) => (
        <div key={ item.title } className="card queue-item">
					{/* <div className="queue-item__position">
						{ i + 1 }
					</div> */}
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
						<h2>
							{ item.title }
						</h2>
						<a href={ item.link }>
							{ item.link }
						</a>
						<p>{ item.message }</p>
					</div>
        </div>
      ) ) }
    </div>
  );
}