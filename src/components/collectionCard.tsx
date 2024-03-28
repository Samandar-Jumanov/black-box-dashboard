export interface Issue {
    id: string;
    userName: string;
    userEmail: string;
    description: string;
    collectionId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import Typography from '@mui/material/Typography';
  import { format } from 'date-fns';
  
  interface IssueCardProps {
    issue: Issue;
  }
  
  const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
    const formatDate = (dateString: string) => {
      return format(new Date(dateString), 'PPpp');
    };
  
    return (
      <Card sx={{ minWidth: 275, marginBottom: 2  }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {issue.userName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Email: {issue.userEmail}
          </Typography>
          <Typography variant="body2">
            Description: {issue.description}
          </Typography>
          <Typography sx={{ mt: 1.5 }} color="text.secondary">
            Created At: {formatDate(issue.createdAt)}
          </Typography>
          <Typography color="text.secondary">
            Updated At: {formatDate(issue.updatedAt)}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default IssueCard;
  