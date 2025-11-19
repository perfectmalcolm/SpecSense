import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RankingFilter = ({ selectedRanking, onRankingChange }) => {
  return (
    <div>
      <h4 className="font-medium text-gray-200 mb-2">Ranking</h4>
      <Select value={selectedRanking} onValueChange={onRankingChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a ranking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newness">Newness</SelectItem>
          <SelectItem value="flagship">Flagship</SelectItem>
          <SelectItem value="cheap">Cheap</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
