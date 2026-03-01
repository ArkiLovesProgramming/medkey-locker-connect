import { useState } from 'react';
import { FamilyMember } from '@/types';
import { AvatarWithImage } from '@/assets/AvatarSVG';
import { Edit2, Trash2, Phone, Mail, Calendar, AlertTriangle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit?: (member: FamilyMember) => void;
  onDelete?: (member: FamilyMember) => void;
  onClick?: (member: FamilyMember) => void;
  showDetails?: boolean;
  className?: string;
}

const FamilyMemberCard = ({ 
  member, 
  onEdit, 
  onDelete, 
  onClick,
  showDetails = true,
  className 
}: FamilyMemberCardProps) => {
  const [showActionsSheet, setShowActionsSheet] = useState(false);

  const getRelationshipLabel = (relationship: FamilyMember['relationship']) => {
    const labels = {
      self: 'Account Holder',
      spouse: 'Spouse',
      child: 'Child',
      parent: 'Parent',
      other: 'Other',
    };
    return labels[relationship] || relationship;
  };

  const getAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const hasAllergies = member.allergies && member.allergies.length > 0;
  const severeAllergies = member.allergies?.filter(a => a.severity === 'severe');

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(member);
    }
    setShowActionsSheet(false);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(member);
    }
    setShowActionsSheet(false);
  };

  const canDelete = member.role !== 'primary';

  return (
    <div 
      className={cn(
        "bg-card rounded-2xl p-4 shadow-sm border border-border",
        "hover:shadow-md transition-shadow duration-200",
        onClick && "cursor-pointer active:scale-[0.98] transition-transform",
        className
      )}
      onClick={() => onClick?.(member)}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <AvatarWithImage
            imageUrl={member.avatar}
            name={`${member.firstName} ${member.lastName}`}
            size={64}
            className="rounded-2xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-foreground text-lg">
                  {member.firstName} {member.lastName}
                </h3>
                <span className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                  member.role === 'primary' 
                    ? "bg-teal-light text-teal-dark" 
                    : "bg-secondary text-muted-foreground"
                )}>
                  {getRelationshipLabel(member.relationship)}
                </span>
              </div>
              
              {showDetails && (
                <>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{getAge(member.dateOfBirth)} years old</span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {member.email && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{member.email}</span>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Allergies Alert */}
                  {hasAllergies && (
                    <div className="mt-2 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="text-muted-foreground">
                          {severeAllergies && severeAllergies.length > 0 ? (
                            <span className="text-destructive font-semibold">
                              Severe: {severeAllergies.map(a => a.name).join(', ')}
                            </span>
                          ) : (
                            <span>{member.allergies.map(a => a.name).join(', ')}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Medical Conditions */}
                  {member.medicalConditions && member.medicalConditions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {member.medicalConditions.slice(0, 3).map((condition, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full"
                        >
                          {condition}
                        </span>
                      ))}
                      {member.medicalConditions.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{member.medicalConditions.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Actions Menu - Desktop */}
            {(onEdit || onDelete) && (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 flex-shrink-0 -mt-1 -mr-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEdit(member);
                      }}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onDelete && canDelete && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(member);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Actions Button - Mobile */}
            {(onEdit || onDelete) && (
              <div className="sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 flex-shrink-0 -mt-1 -mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActionsSheet(true);
                  }}
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Actions Bottom Sheet */}
      <Dialog open={showActionsSheet} onOpenChange={setShowActionsSheet}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {member.firstName} {member.lastName}
            </DialogTitle>
            <DialogDescription>
              Choose an action for this family member
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {onEdit && (
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base"
                onClick={handleEditClick}
              >
                <Edit2 className="w-5 h-5 mr-3" />
                Edit Member
              </Button>
            )}
            {onDelete && canDelete && (
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base text-destructive hover:text-destructive"
                onClick={handleDeleteClick}
              >
                <Trash2 className="w-5 h-5 mr-3" />
                Delete Member
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowActionsSheet(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyMemberCard;
