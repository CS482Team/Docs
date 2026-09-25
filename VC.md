# Version Control

## Branches

| Branch | Updated when... | Merge Requirements |
| - | - | - |
| main | sprint ends | 2 PR Approvals |
| develop | feature/fix done | 1 PR Approval |
| feature/fix | whenever you want | N/A |

## New Branch

Create your branch off of develop branch:
```bash
git switch develop
git pull origin develop
git checkout -b <new-branch-name>
... # Code stuff
git commit #...
git push -u origin <new-branch-name>
```

### Branch Naming

```bash
feature/{issue-number}-{whatever-you-want} # feature/13-sort-search-results
fix/{issue-number}-{whatever-you-want}     # fix/14-remove-sort-error
```

## Commit Messages

Include the issue number at the start of your commit message:
```bash
git commit -m "#15 My commit message"
```

If you accidentally committed with the wrong message:
```bash
git commit --amend -m "#15 Replacement commit message"
git push # And if you had already pushed the other commit, instead use: git push --force-with-lease
```

## Pull Requests

Request to update the develop branch with the changes on your branch:
- Repository > Pull Requests > New Pull Request
- Target: `develop`
- Source: `new-branch-name`

At the end of a sprint:
- Target: `main`
- Source: `develop`
