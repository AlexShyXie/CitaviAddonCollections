using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel;
using SwissAcademic.Citavi;
using SwissAcademic.Citavi.Citations;
using SwissAcademic.Citavi.Metadata;
using SwissAcademic.Collections;

namespace SwissAcademic.Citavi.Comparers
{
    public class CustomCitationComparer
       :
       ICustomCitationComparerMacro
    {
        #region EDIT Sections for each Reference Type

        bool MakeSectionZeroFirstSection = false;

        Dictionary<Tuple<ReferenceType, ReferenceType>, int> FullReferenceTypeSections = new Dictionary<Tuple<ReferenceType, ReferenceType>, int>()
         {
            //0 means "Other" or "Default"; these references will be sorted to the end of the list or - if MakeSectionZeroFirstSection - at the beginning
            //for other sections use numbers 1, 2, 3 etc. and the references will be grouped and ordered in an ascending fashion 
            {FullReferenceType.ArchiveMaterial, 0},
            {FullReferenceType.ArchiveMaterialInBookEdited, 0},
            {FullReferenceType.AudioBook, 0},
            {FullReferenceType.AudioOrVideoDocument, 0},
            {FullReferenceType.Book, 1},
            {FullReferenceType.BookEdited, 0},
            {FullReferenceType.Broadcast, 0},
            {FullReferenceType.CollectedWorks, 0},
            {FullReferenceType.ComputerProgram, 0},
            {FullReferenceType.ConferenceProceedings, 0},
            {FullReferenceType.ContributionInBookEdited, 4},
            {FullReferenceType.ContributionInCollectedWorks, 4},
            {FullReferenceType.ContributionInConferenceProceedings, 4},
            {FullReferenceType.ContributionInSpecialIssue, 4},
            {FullReferenceType.ContributionInUnpublishedWork, 4},
            {FullReferenceType.ContributionInLegalCommentary, 4},
            {FullReferenceType.CourtDecision, 0},
            {FullReferenceType.File, 0},
            {FullReferenceType.InternetDocument, 5},
            {FullReferenceType.InterviewMaterial, 6},
            {FullReferenceType.JournalArticle, 2},
            {FullReferenceType.Lecture, 0},
            {FullReferenceType.LegalCommentary, 0},
            {FullReferenceType.Manuscript, 0},
            {FullReferenceType.Map, 0},
            {FullReferenceType.Movie, 0},
            {FullReferenceType.MusicAlbum, 0},
            {FullReferenceType.MusicTrack, 0},
            {FullReferenceType.MusicTrackInMusicAlbum, 0},
            {FullReferenceType.NewsAgencyReport, 0},
            {FullReferenceType.NewspaperArticle, 2},
            {FullReferenceType.Patent, 0},
            {FullReferenceType.PersonalCommunication, 0},
            {FullReferenceType.PressRelease, 0},
            {FullReferenceType.RadioPlay, 0},
            {FullReferenceType.SpecialIssue, 0},
            {FullReferenceType.Standard, 3},
            {FullReferenceType.StatuteOrRegulation, 0},
            {FullReferenceType.StatuteOrRegulationInBookEdited, 0},
            {FullReferenceType.Thesis, 1},
            {FullReferenceType.Unknown, 0},
            {FullReferenceType.UnpublishedWork, 4}
         };

        #endregion EDIT Sections for each Reference Type

        public int Compare(Citation x, Citation y)
        {
            /*
               This is an example of a custom sort macro that sorts all references of type 'court decision' at the bottom of the bibliography.
               The internet documents themselves are sorted according to a different logic than the rest of the cited documents.
               Return values:
               0:                  x is considered the same as y sorting-wise, so we cannot tell a difference based on the algorithm below
               > 0 (positive):     x should go after y, x is greater than y
               < 0 (negative):     x should go before y, x is less than
        */

            //First we make sure we are comparing BibliographyCitations only
            var xBibliographyCitation = x as BibliographyCitation;
            var yBibliographyCitation = y as BibliographyCitation;

            if (xBibliographyCitation == null || yBibliographyCitation == null) return 0;
            var xReference = xBibliographyCitation.Reference;
            var yReference = yBibliographyCitation.Reference;
            if (xReference == null || yReference == null) return 0;

            var defaultCitationComparer = CitationComparer.AuthorYearTitleAscending;

            var xSection = GetBibliographySection(xReference);
            var ySection = GetBibliographySection(yReference);

            var sectionComparison = xSection.CompareTo(ySection);

            if (sectionComparison == 0)
            {
                return defaultCitationComparer.Compare(x, y);
            }
            else
            {
                return sectionComparison;
            }
        }

        int GetBibliographySection(IReference reference)
        {
            if (reference.ReferenceType == null) return MakeSectionZeroFirstSection ? int.MinValue : int.MaxValue; ;

            Tuple<ReferenceType, ReferenceType> fullReferenceType = FullReferenceType.GetFullReferenceType(reference);
            if (fullReferenceType == null) return MakeSectionZeroFirstSection ? int.MinValue : int.MaxValue;

            int section;
            if (FullReferenceTypeSections.TryGetValue(fullReferenceType, out section))
            {
                if (section == 0) return MakeSectionZeroFirstSection ? int.MinValue : int.MaxValue;
                return section;
            }

            return MakeSectionZeroFirstSection ? int.MinValue : int.MaxValue; ;
        }
    }

    public static class FullReferenceType
    {
        #region  Constructor

        static FullReferenceType()
        {
            ArchiveMaterial = new Tuple<ReferenceType, ReferenceType>(ReferenceType.ArchiveMaterial, null);         //can stand alone
            ArchiveMaterialInBookEdited = new Tuple<ReferenceType, ReferenceType>(ReferenceType.ArchiveMaterial, ReferenceType.BookEdited);

            AudioBook = new Tuple<ReferenceType, ReferenceType>(ReferenceType.AudioBook, null);
            AudioOrVideoDocument = new Tuple<ReferenceType, ReferenceType>(ReferenceType.AudioOrVideoDocument, null);
            Book = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Book, null);
            BookEdited = new Tuple<ReferenceType, ReferenceType>(ReferenceType.BookEdited, null);
            Broadcast = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Broadcast, null);
            CollectedWorks = new Tuple<ReferenceType, ReferenceType>(ReferenceType.CollectedWorks, null);
            ComputerProgram = new Tuple<ReferenceType, ReferenceType>(ReferenceType.ComputerProgram, null);
            ConferenceProceedings = new Tuple<ReferenceType, ReferenceType>(ReferenceType.ConferenceProceedings, null);

            //Contribution                 = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Contribution, null);            //can NOT stand alone
            ContributionInBookEdited = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Contribution, ReferenceType.BookEdited);
            ContributionInCollectedWorks = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Contribution, ReferenceType.CollectedWorks);
            ContributionInConferenceProceedings = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Contribution, ReferenceType.ConferenceProceedings);
            ContributionInSpecialIssue = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Contribution, ReferenceType.SpecialIssue);
            ContributionInUnpublishedWork = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Contribution, ReferenceType.UnpublishedWork);

            ContributionInLegalCommentary = new Tuple<ReferenceType, ReferenceType>(ReferenceType.ContributionInLegalCommentary, null);
            CourtDecision = new Tuple<ReferenceType, ReferenceType>(ReferenceType.CourtDecision, null);
            File = new Tuple<ReferenceType, ReferenceType>(ReferenceType.File, null);
            InternetDocument = new Tuple<ReferenceType, ReferenceType>(ReferenceType.InternetDocument, null);
            InterviewMaterial = new Tuple<ReferenceType, ReferenceType>(ReferenceType.InterviewMaterial, null);
            JournalArticle = new Tuple<ReferenceType, ReferenceType>(ReferenceType.JournalArticle, null);
            Lecture = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Lecture, null);
            LegalCommentary = new Tuple<ReferenceType, ReferenceType>(ReferenceType.LegalCommentary, null);
            Manuscript = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Manuscript, null);
            Map = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Map, null);
            Movie = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Movie, null);
            MusicAlbum = new Tuple<ReferenceType, ReferenceType>(ReferenceType.MusicAlbum, null);

            MusicTrack = new Tuple<ReferenceType, ReferenceType>(ReferenceType.MusicTrack, null);
            MusicTrackInMusicAlbum = new Tuple<ReferenceType, ReferenceType>(ReferenceType.MusicTrack, ReferenceType.MusicAlbum);

            NewsAgencyReport = new Tuple<ReferenceType, ReferenceType>(ReferenceType.NewsAgencyReport, null);
            NewspaperArticle = new Tuple<ReferenceType, ReferenceType>(ReferenceType.NewspaperArticle, null);
            Patent = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Patent, null);
            PersonalCommunication = new Tuple<ReferenceType, ReferenceType>(ReferenceType.PersonalCommunication, null);
            PressRelease = new Tuple<ReferenceType, ReferenceType>(ReferenceType.PressRelease, null);
            RadioPlay = new Tuple<ReferenceType, ReferenceType>(ReferenceType.RadioPlay, null);
            SpecialIssue = new Tuple<ReferenceType, ReferenceType>(ReferenceType.SpecialIssue, null);
            Standard = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Standard, null);

            StatuteOrRegulation = new Tuple<ReferenceType, ReferenceType>(ReferenceType.StatuteOrRegulation, null);               //can stand alone, but is then more or less a StatuteOrRegulationInPeriodical
            StatuteOrRegulationInBookEdited = new Tuple<ReferenceType, ReferenceType>(ReferenceType.StatuteOrRegulation, ReferenceType.BookEdited);

            Thesis = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Thesis, null);
            Unknown = new Tuple<ReferenceType, ReferenceType>(ReferenceType.Unknown, null);
            UnpublishedWork = new Tuple<ReferenceType, ReferenceType>(ReferenceType.UnpublishedWork, null);
        }

        #endregion Constructor

        #region Properties

        public static Tuple<ReferenceType, ReferenceType> ArchiveMaterial { get; private set; }               //can stand alone
        public static Tuple<ReferenceType, ReferenceType> ArchiveMaterialInBookEdited { get; private set; }

        public static Tuple<ReferenceType, ReferenceType> AudioBook { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> AudioOrVideoDocument { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Book { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> BookEdited { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Broadcast { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> CollectedWorks { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> ComputerProgram { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> ConferenceProceedings { get; private set; }

        //public static Tuple<ReferenceType, ReferenceType> Contribution {get; private set;}                  //can NOT stand alone
        public static Tuple<ReferenceType, ReferenceType> ContributionInBookEdited { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> ContributionInCollectedWorks { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> ContributionInConferenceProceedings { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> ContributionInSpecialIssue { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> ContributionInUnpublishedWork { get; private set; }

        public static Tuple<ReferenceType, ReferenceType> ContributionInLegalCommentary { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> CourtDecision { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> File { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> InternetDocument { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> InterviewMaterial { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> JournalArticle { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Lecture { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> LegalCommentary { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Manuscript { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Map { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Movie { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> MusicAlbum { get; private set; }

        public static Tuple<ReferenceType, ReferenceType> MusicTrack { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> MusicTrackInMusicAlbum { get; private set; }

        public static Tuple<ReferenceType, ReferenceType> NewsAgencyReport { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> NewspaperArticle { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Patent { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> PersonalCommunication { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> PressRelease { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> RadioPlay { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> SpecialIssue { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Standard { get; private set; }

        public static Tuple<ReferenceType, ReferenceType> StatuteOrRegulation { get; private set; }               //can stand alone, but is then more or less a StatuteOrRegulationInPeriodical
        public static Tuple<ReferenceType, ReferenceType> StatuteOrRegulationInBookEdited { get; private set; }

        public static Tuple<ReferenceType, ReferenceType> Thesis { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> Unknown { get; private set; }
        public static Tuple<ReferenceType, ReferenceType> UnpublishedWork { get; private set; }

        #endregion Properties

        #region Methods

        #region GetFullReferenceTypes

        public static IEnumerable<Tuple<ReferenceType, ReferenceType>> GetFullReferenceTypes()
        {
            yield return FullReferenceType.ArchiveMaterial;
            yield return FullReferenceType.AudioBook;
            yield return FullReferenceType.AudioOrVideoDocument;
            yield return FullReferenceType.Book;
            yield return FullReferenceType.BookEdited;
            yield return FullReferenceType.Broadcast;
            yield return FullReferenceType.CollectedWorks;

            yield return FullReferenceType.ComputerProgram;
            yield return FullReferenceType.ConferenceProceedings;

            yield return FullReferenceType.ContributionInBookEdited;
            yield return FullReferenceType.ContributionInCollectedWorks;
            yield return FullReferenceType.ContributionInConferenceProceedings;

            yield return FullReferenceType.ContributionInSpecialIssue;
            yield return FullReferenceType.ContributionInUnpublishedWork;

            yield return FullReferenceType.ContributionInLegalCommentary;
            yield return FullReferenceType.CourtDecision;
            yield return FullReferenceType.File;
            yield return FullReferenceType.InternetDocument;
            yield return FullReferenceType.InterviewMaterial;
            yield return FullReferenceType.JournalArticle;
            yield return FullReferenceType.Lecture;
            yield return FullReferenceType.LegalCommentary;

            yield return FullReferenceType.Manuscript;
            yield return FullReferenceType.Map;
            yield return FullReferenceType.Movie;
            yield return FullReferenceType.MusicAlbum;
            yield return FullReferenceType.MusicTrack;
            yield return FullReferenceType.MusicTrackInMusicAlbum;

            yield return FullReferenceType.NewsAgencyReport;
            yield return FullReferenceType.NewspaperArticle;
            yield return FullReferenceType.Patent;
            yield return FullReferenceType.PersonalCommunication;
            yield return FullReferenceType.PressRelease;
            yield return FullReferenceType.RadioPlay;
            yield return FullReferenceType.SpecialIssue;
            yield return FullReferenceType.Standard;

            yield return FullReferenceType.StatuteOrRegulation;
            yield return FullReferenceType.StatuteOrRegulationInBookEdited;

            yield return FullReferenceType.Thesis;
            yield return FullReferenceType.Unknown;
            yield return FullReferenceType.UnpublishedWork;
        }

        #endregion GetFullReferenceTypes

        #region GetFullReferenceType

        public static Tuple<ReferenceType, ReferenceType> GetFullReferenceType(IReference reference)
        {
            if (reference == null) return null;
            if (reference.ReferenceType == null) return null;

            ReferenceType referenceType = reference.ReferenceType;


            ReferenceType parentReferenceType;

            if (reference.ParentReference == null || reference.ParentReference.ReferenceType == null)
            {
                parentReferenceType = null;
            }
            else
            {
                parentReferenceType = reference.ParentReference.ReferenceType;
            }

            return new Tuple<ReferenceType, ReferenceType>(referenceType, parentReferenceType);

        }

        #endregion GetFullReferenceType

        #endregion Methods
    }

}