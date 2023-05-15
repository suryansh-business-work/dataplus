

export const roles = [
  {
    name: "Admin",
    slug: 'admin'
  },
  {
    name: "Member",
    slug: 'member'
  },
  {
    name: "Reader",
    slug: 'reader'
  }
]

export enum RoleInviteStatus {
  invited = "Invited",
  accepted = "Accepted",
  rejected = "Rejected",
  expired = "Expired"
}