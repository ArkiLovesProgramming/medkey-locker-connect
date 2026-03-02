import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FamilyMember } from '@/types';
import { Plus, Search, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useFamilyMembers, useAddFamilyMember, useUpdateFamilyMember, useRemoveFamilyMember } from '@/hooks/useData';
import FamilyMemberCard from '@/components/FamilyMemberCard';
import FamilyMemberForm from '@/components/FamilyMemberForm';

interface FamilyManagementProps {
  onNavigate?: (screen: number) => void;
}

const FamilyManagement = ({ onNavigate }: FamilyManagementProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | undefined>();
  
  const { data: familyMembers, isLoading, refetch } = useFamilyMembers();
  const addMemberMutation = useAddFamilyMember();
  const updateMemberMutation = useUpdateFamilyMember();
  const removeMemberMutation = useRemoveFamilyMember();

  const handleAddMember = async (data: Omit<FamilyMember, 'id' | 'createdAt' | 'role'>) => {
    await addMemberMutation.mutateAsync(data);
    await refetch();
    setIsFormOpen(false);
  };

  const handleEditMember = async (data: Omit<FamilyMember, 'id' | 'createdAt' | 'role'>) => {
    if (!editingMember) return;
    await updateMemberMutation.mutateAsync({
      memberId: editingMember.id,
      updates: data,
    });
    await refetch();
    setIsFormOpen(false);
    setEditingMember(undefined);
  };

  const handleDeleteMember = async (member: FamilyMember) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${member.firstName} ${member.lastName} from your family?`
    );
    
    if (!confirmed) return;

    try {
      await removeMemberMutation.mutateAsync(member.id);
      await refetch();
      toast({
        title: 'Member Removed',
        description: `${member.firstName} ${member.lastName} has been removed from your family.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove family member.',
        variant: 'destructive',
      });
    }
  };

  const openEditForm = (member: FamilyMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingMember(undefined);
    setIsFormOpen(true);
  };

  const filteredMembers = familyMembers?.filter(member => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      member.firstName.toLowerCase().includes(query) ||
      member.lastName.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.relationship.toLowerCase().includes(query)
    );
  });

  // Group members by relationship
  const groupedMembers = {
    primary: filteredMembers?.filter(m => m.role === 'primary') || [],
    spouse: filteredMembers?.filter(m => m.relationship === 'spouse') || [],
    children: filteredMembers?.filter(m => m.relationship === 'child') || [],
    parents: filteredMembers?.filter(m => m.relationship === 'parent') || [],
    other: filteredMembers?.filter(m => m.relationship === 'other') || [],
  };

  const hasResults = Object.values(groupedMembers).some(group => group.length > 0);

  return (
    <div className="pb-24 px-5 pt-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (onNavigate) {
              onNavigate(6);
            } else {
              // Navigate back to profile page (screen 6)
              navigate('/?screen=6');
            }
          }}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Family Management</h1>
          <p className="text-sm text-muted-foreground">Manage your family members</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search family members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Add Member Button */}
      <Button
        onClick={openAddForm}
        className="w-full mb-6 bg-teal-dark hover:bg-teal-dark/90 text-white"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Family Member
      </Button>

      {/* Members List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading family members...</p>
        </div>
      ) : !hasResults ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchQuery ? 'No family members found matching your search.' : 'No family members yet.'}
          </p>
          {!searchQuery && (
            <Button
              onClick={openAddForm}
              variant="link"
              className="mt-2 text-teal-dark"
            >
              Add your first family member
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Primary Account Holder */}
          {groupedMembers.primary.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Account Holder
              </h2>
              {groupedMembers.primary.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEditForm}
                  onClick={openEditForm}
                />
              ))}
            </div>
          )}

          {/* Spouse */}
          {groupedMembers.spouse.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Spouse
              </h2>
              {groupedMembers.spouse.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEditForm}
                  onDelete={handleDeleteMember}
                  onClick={openEditForm}
                />
              ))}
            </div>
          )}

          {/* Children */}
          {groupedMembers.children.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Children
              </h2>
              {groupedMembers.children.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEditForm}
                  onDelete={handleDeleteMember}
                  onClick={openEditForm}
                />
              ))}
            </div>
          )}

          {/* Parents */}
          {groupedMembers.parents.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Parents
              </h2>
              {groupedMembers.parents.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEditForm}
                  onDelete={handleDeleteMember}
                  onClick={openEditForm}
                />
              ))}
            </div>
          )}

          {/* Other */}
          {groupedMembers.other.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Other
              </h2>
              {groupedMembers.other.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEditForm}
                  onDelete={handleDeleteMember}
                  onClick={openEditForm}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Form Dialog */}
      <FamilyMemberForm
        member={editingMember}
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setEditingMember(undefined);
          }
        }}
        onSubmit={editingMember ? handleEditMember : handleAddMember}
      />
    </div>
  );
};

export default FamilyManagement;
