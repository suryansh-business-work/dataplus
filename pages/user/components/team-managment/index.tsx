// Core Modules
import { useRef, useState } from 'react';
import type { NextPage } from 'next'

// Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputSwitch } from 'primereact/inputswitch';

// Data
import { teamMembers } from '../../../data/team-member'
import { RoleInviteStatus, roles } from '../../../data/rolesData';

// Utils
import { copyToClipboard } from '../../../utils/global-functions';

// Dialog Components
import InviteMemberDialog from './dialog/invite-member';
import DeleteRoleDialog from './dialog/delete-role';
import CredentialDialog from './dialog/credential';

const TeamManagement: NextPage = () => {
  const [members, setMembers]: any = useState(teamMembers);
  const roleInviteStatus: any = RoleInviteStatus;
  const [dialogVisibility, setDialogVisibility]: any = useState(false);
  const [selectedDialog, setSelectedDialog]: any = useState(null);
  const toast: any = useRef(null);

  const onRoleChange = (change: any, rowData: any, event: any) => {
    let updatedData;
    if (change == 'role-change') {
      updatedData = members.map((obj: any) =>
        obj.id === rowData.id ? { ...obj, role: event.value } : obj
      );
      toast.current.show({ severity: 'info', summary: 'Role updated', detail: `${rowData.name} Role updated successfully to ${event.value}`, life: 3000 });
    } else if (change == 'active-state-change') {
      updatedData = members.map((obj: any) =>
        obj.id === rowData.id ? { ...obj, isActive: event.value } : obj
      );
      const roleStatusText = rowData.isActive == false ? 'activated' : 'deactivated';
      toast.current.show({ severity: 'info', summary: 'Status updated', detail: `${rowData.name} is now ${roleStatusText}`, life: 3000 });
    }
    const updatedMember = updatedData.find((value: any) => value.id == rowData.id)
    console.log(updatedMember)
    setMembers(updatedData)
  }

  const columnBody = {
    inviteStatus: (rowData: any) => {
      return (<Badge value={roleInviteStatus[rowData.status]} severity="success" className={rowData.status}></Badge>)
    },
    roleDropdown: (rowData: any) => {
      return (<Dropdown value={rowData.role} options={roles} onChange={(event) => onRoleChange('role-change', rowData, event)} optionLabel="name" optionValue="slug" placeholder="Select Member Role" />)
    },
    activeStatus: (rowData: any) => {
      return (<InputSwitch checked={rowData.isActive} onChange={(event) => onRoleChange('active-state-change', rowData, event)} />)
    },
    actions: (rowData: any) => {
      return (
        <>
          {(() => {
            if (rowData.status == 'accepted' && rowData.role == 'admin') {
              return <ul className='table-actions-option'>
                <Tooltip className="subcription-tooltips" target=".custom-label-icon" />
                <li><a className="custom-label-icon" data-pr-tooltip="Go to account" data-pr-position="right"><i className="fa-solid fa-right-to-bracket"></i></a></li>
                <li><a className="custom-label-icon" onClick={() => showDialog('credential')} data-pr-tooltip="Show Credential" data-pr-position="right"><i className="fa-solid fa-key"></i></a></li>
                <li><a className="custom-label-icon" onClick={() => showDialog('deleteMember')} data-pr-tooltip="Delete" data-pr-position="right"><i className="fa-solid fa-trash"></i></a></li>
              </ul>
            } else if (rowData.status == 'accepted') {
              return <ul className='table-actions-option'>
                <Tooltip className="subcription-tooltips" target=".custom-label-icon" />
                <li><a className="custom-label-icon" data-pr-tooltip="Go to account" data-pr-position="right"><i className="fa-solid fa-right-to-bracket"></i></a></li>
                <li><a className="custom-label-icon" onClick={() => showDialog('deleteMember')} data-pr-tooltip="Delete" data-pr-position="right"><i className="fa-solid fa-trash"></i></a></li>
              </ul>
            } else if (rowData.status == 'rejected') {
              return <ul className='table-actions-option'>
                <Tooltip className="subcription-tooltips" target=".custom-label-icon" />
                <li><a className="custom-label-icon" onClick={() => showDialog('deleteMember')} data-pr-tooltip="Delete" data-pr-position="right"><i className="fa-solid fa-trash"></i></a></li>
              </ul>
            } else if (rowData.status == 'invited') {
              return <ul className='table-actions-option'>
                <Tooltip className="subcription-tooltips" target=".custom-label-icon" />
                <li><a className="custom-label-icon" onClick={() => copyInvitationLink(rowData)} data-pr-tooltip="Copy Invitation Link" data-pr-position="right"><i className="fa-solid fa-copy"></i></a></li>
                <li><a className="custom-label-icon" onClick={() => showDialog('credential')} data-pr-tooltip="Show Credential" data-pr-position="right"><i className="fa-solid fa-key"></i></a></li>
                <li><a className="custom-label-icon" onClick={() => resendInvitation(rowData)} data-pr-tooltip="Resend invitation" data-pr-position="right"><i className="fa-solid fa-paper-plane"></i></a></li>
                <li><a className="custom-label-icon" onClick={() => showDialog('deleteMember')} data-pr-tooltip="Delete" data-pr-position="right"><i className="fa-solid fa-trash"></i></a></li>
              </ul>
            }
          })()}
        </>
      )
    }
  }

  const copyInvitationLink = (user: any) => {
    toast.current.show({ severity: 'success', summary: 'Copied', detail: `Copied invitation link for ${user.name}`, life: 3000 });
    copyToClipboard(user)
  }

  const resendInvitation = (user: any) => {
    toast.current.show({ severity: 'success', summary: 'Invite Sent', detail: `Invite sent to ${user.name}`, life: 3000 });
  }

  const dialog: any = {
    deleteMember: {
      header: 'Delete User',
      footer: (name: any) => (
        <div>
          <Button label="Close" icon="pi pi-times" onClick={() => setDialogVisibility(false)} className="p-button-text" />
          <Button className="p-button-danger" label="Delete" icon="fa-solid fa-user-xmark" onClick={() => setDialogVisibility(false)} autoFocus />
        </div>
      ),
      component: DeleteRoleDialog
    },
    inviteMember: {
      header: 'Invite Member',
      footer: (name: any) => (
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={() => setDialogVisibility(false)} className="p-button-text" />
          <Button label="Invite" icon="pi pi-check" onClick={() => setDialogVisibility(false)} autoFocus />
        </div>
      ),
      component: InviteMemberDialog
    },
    credential: {
      header: 'Credential',
      footer: (name: any) => (
        <div>
          <Button label="Close" icon="pi pi-times" onClick={() => setDialogVisibility(false)} className="p-button-text" />
        </div>
      ),
      component: CredentialDialog
    }
  }
  
  const onDialogHide = () => {
    setDialogVisibility(false);
  }

  const DialogElm = () => {
    if (selectedDialog && dialogVisibility) {
      const dialogStore = dialog[selectedDialog]
      const header = dialogStore?.header;
      const footer = dialogStore?.footer;
      const Component = dialogStore?.component;
      return (
        <Dialog header={header} visible={dialogVisibility} style={{ width: '50vw' }} footer={footer} onHide={() => onDialogHide()}>
          <Component />
        </Dialog>
      )
    } else {
      return <></>;
    }

  }

  const showDialog = (selectedDialog: any) => {
    if (selectedDialog) {
      setSelectedDialog(selectedDialog);
      setDialogVisibility(true)
    }
  }

  return (
    <div className='component-card mb-5'>
      <Toast position="bottom-right" ref={toast} />
      {selectedDialog && dialogVisibility ? <DialogElm /> : null}
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>Team Members ({members.length})</h3>
        </div>
        <div className='component-actions'>
          <Button onClick={() => showDialog('inviteMember')}>Invite Member</Button>
        </div>
      </div>
      <div className='component-card-body'>
        <div className='custom-table'>
          <DataTable value={members} paginator responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="status" header="Status" body={columnBody.inviteStatus}></Column>
            <Column field="active" header="Active" body={columnBody.activeStatus}></Column>
            <Column field="role" header="Role" body={columnBody.roleDropdown}></Column>
            <Column field="action" header="Actions" body={columnBody.actions}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default TeamManagement
