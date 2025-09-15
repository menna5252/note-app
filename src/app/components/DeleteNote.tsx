'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { deleteNote } from '../../actions/delete-note'
import { toast } from 'sonner'


export default function DeleteeNote({id}:{id:string}) {
    const handleDelete = async () => {
        try {
          const res = await deleteNote(id)
          if (res?.msg === 'done') {
            toast.success("Note deleted successfully!")
          } 
        } catch (err) {
          toast.error( "Note deleted failed")
          console.error(err)
        }
      }
      return (
    
    <Button variant={'destructive'} onClick={handleDelete}>
       Delete
    </Button>
      )
      
    }
