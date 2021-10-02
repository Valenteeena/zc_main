import React from 'react'
import { useState } from 'react'
import styles from '../styles/Drop.module.css'
import { TiArrowSortedDown } from 'react-icons/ti'
import { navigateToUrl } from 'single-spa'
import hash from '../assets/images/hash.svg'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import PluginRoomAddUser from './PluginRoomAddUser'

const DropDown = ({ itemName, items }) => {
  const [addToRoom, setAddToRoom] = useState(false)
  const [roomId, setRoomId] = useState(false)
  const [isOpen, setOpen] = useState(false)
  // const [items, setItems] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null)

  const toggleDropdown = () => setOpen(!isOpen)

  // console.log(items)
  const handleItemClick = id => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id)
  }
  return (
    <div className={`row p-0 ${styles.dropDown} text-decoration-none`}>
      <div
        className={`col-12 d-flex align-items-center ${styles.plugin__title}`}
        onClick={toggleDropdown}
      >
        <div>
          <TiArrowSortedDown
            className={`${styles.icon} ${isOpen && styles.open}`}
          />
        </div>
        <div
          className={`w-100 d-flex align-items-center justify-content-between`}
        >
          <p className={`mb-0 ${styles.dropDown__title}`}> {itemName} </p>
          {(items && items.group_name.toLowerCase() === 'dm') ||
          (items && items.group_name.toLowerCase() === 'channel') ||
          (items && items.group_name.toLowerCase() === 'company files') ||
          (items && items.group_name.toLowerCase() === 'active todos') ||
          (items && items.group_name.toLowerCase() === 'chess games') ||
          (items && items.group_name.toLowerCase() === 'music') ||
          (items && items.group_name.toLowerCase() === 'goals') ? (
            <a
              href={
                items && items.group_name.toLowerCase() === 'dm'
                  ? '/dm'
                  : '/channels'
              }
              onClick={navigateToUrl}
            >
              <AiOutlinePlusCircle className={`${styles.icon}`} />
            </a>
          ) : null}
        </div>
      </div>
      <ul
        className={`col-12 ps-4 ${styles.item__row} ${isOpen && styles.open}`}
      >
        {items.joined_rooms &&
          items.joined_rooms.map((room, index) => {
            if (room.room_name !== undefined) {
              return (
                // console.log(itemList)
                <li key={index} className={`row ${styles.item__list}`}>
                  <a
                    className={`col-12 d-flex align-items-center ${styles.item_name}`}
                    href={room.room_url}
                    onClick={navigateToUrl}
                  >
                    <img
                      className={`${styles.item__image}`}
                      src={room.room_image || hash.toString()}
                      onError={e => (e.target.src = hash.toString())}
                      alt="img"
                    />
                    <div className={`mb-0 ${styles.dropDown__name}`}>
                      {room.room_name}
                      {/* Add to Room Button */}
                      <AiOutlinePlusCircle
                        className={`d-inline-flex align-items-center ms-2 ${styles.icon}`}
                        onClick={() => {
                          setAddToRoom(!addToRoom)
                          setRoomId(room._id)
                        }}
                      />
                    </div>
                  </a>
                </li>
              )
            }
          })}
      </ul>
      {/* Add to Room */}
      {addToRoom && (
        <PluginRoomAddUser
          isOpen={addToRoom}
          isClosed={setAddToRoom}
          room_id={roomId}
        />
      )}
    </div>
  )
}

export default DropDown
