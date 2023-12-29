import { asyncHandler } from '../../utils/asyncHandler.js'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './users.service.js'

export const getAllUsersHandler = asyncHandler(async (req, res) => {
  const data = await getAllUsers()
  return res.json(data)
})

export const getUserByIdHandler = asyncHandler(async (req, res) => {
  const data = await getUserById(<string>req.params.id)
  return res.json(data)
})

export const createUserHandler = asyncHandler(async (req, res) => {
  const data = await createUser(req.body)
  return res.json(data)
})

export const updateUserHandler = asyncHandler(async (req, res) => {
  const data = await updateUser(<string>req.params.id, req.body)
  return res.json(data)
})

export const deleteUserHandler = asyncHandler(async (req, res) => {
  const data = await deleteUser(<string>req.params.id)
  return res.json(data)
})
